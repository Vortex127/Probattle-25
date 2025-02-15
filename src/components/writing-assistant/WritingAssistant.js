import { useState, useEffect } from 'react';
import nlp from 'compromise';
import paragraphs from 'compromise-paragraphs';
nlp.extend(paragraphs);

export default function WritingAssistant({ content }) {
  const [analysis, setAnalysis] = useState({
    complexWords: [],
    readabilityScore: 0,
    suggestions: []
  });

  useEffect(() => {
    if (!content) return;

    // Remove HTML tags for analysis
    const plainText = content.replace(/<[^>]*>/g, '');
    
    // Analyze text
    const doc = nlp(plainText);
    
    // Find complex words (words with more than 3 syllables)
    const words = doc.terms().out('array');
    const complexWords = words.filter(word => {
      const syllables = countSyllables(word);
      return syllables > 3;
    });

    // Calculate basic readability score
    const sentences = doc.sentences().out('array');
    const avgWordsPerSentence = words.length / sentences.length;
    const readabilityScore = calculateReadabilityScore(avgWordsPerSentence, complexWords.length / words.length);

    // Generate suggestions
    const suggestions = generateSuggestions(complexWords, avgWordsPerSentence);

    setAnalysis({
      complexWords,
      readabilityScore,
      suggestions
    });
  }, [content]);

  // Helper function to estimate syllables
  const countSyllables = (word) => {
    word = word.toLowerCase();
    word = word.replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 0;
  };

  // Calculate readability score (simplified version)
  const calculateReadabilityScore = (avgWordsPerSentence, complexWordRatio) => {
    // Lower score is better (1-10 scale)
    const score = ((avgWordsPerSentence * 0.39) + (complexWordRatio * 11.8)) / 2;
    return Math.min(Math.max(score, 1), 10);
  };

  // Generate writing suggestions
  const generateSuggestions = (complexWords, avgWordsPerSentence) => {
    const suggestions = [];

    if (complexWords.length > 0) {
      suggestions.push({
        type: 'complexity',
        message: 'Consider simplifying these complex words:',
        details: complexWords
      });
    }

    if (avgWordsPerSentence > 20) {
      suggestions.push({
        type: 'length',
        message: 'Your sentences are quite long. Consider breaking them into shorter ones for better readability.'
      });
    }

    return suggestions;
  };

  // Get color for readability score
  const getScoreColor = (score) => {
    if (score <= 4) return 'text-green-600';
    if (score <= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Writing Assistant</h3>
      
      {/* Readability Score */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">Readability Score:</p>
        <p className={`text-2xl font-bold ${getScoreColor(analysis.readabilityScore)}`}>
          {analysis.readabilityScore.toFixed(1)}/10
        </p>
      </div>

      {/* Suggestions */}
      {analysis.suggestions.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Suggestions:</h4>
          {analysis.suggestions.map((suggestion, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-700">{suggestion.message}</p>
              {suggestion.details && (
                <ul className="mt-2 list-disc list-inside">
                  {suggestion.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-600">{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No issues found */}
      {analysis.suggestions.length === 0 && content && (
        <p className="text-sm text-green-600">
          No major issues found in your writing!
        </p>
      )}
    </div>
  );
}
