import React, { useState, useCallback } from 'react';
import { Upload, MessageSquare, Loader } from 'lucide-react';

const App = () => {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [error, setError] = useState(null);

  const handleQuery = useCallback(async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResponse('');  // Clear previous response
    
    try {
      console.log('Sending query:', query);
      
      const response = await fetch('http://localhost:8080/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      console.log('Raw response:', response);

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      console.log('Response text:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('JSON parse error:', e);
        throw new Error('Invalid response format from server');
      }

      console.log('Parsed data:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.response === undefined) {
        throw new Error('No response data from server');
      }

      setResponse(data.response);
      setError(null);
    } catch (error) {
      console.error('Query error:', error);
      setError(error.message || 'An error occurred while processing your query');
      setResponse('');
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    console.log('Selected file:', selectedFile);
    
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setLoading(true);
      setUploadStatus('Uploading...');
      setError(null);

      const formData = new FormData();
      formData.append('file', selectedFile);
      
      try {
        const response = await fetch('http://localhost:8080/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const responseData = await response.json();
        console.log('Upload response:', responseData);

        if (response.ok) {
          setUploadStatus('File processed successfully!');
        } else {
          throw new Error(responseData.error || 'Upload failed');
        }
      } catch (error) {
        console.error('Upload error:', error);
        setError(error.message);
        setUploadStatus('Error uploading file');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please select a PDF file');
      setUploadStatus('Invalid file type');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">RAG System Interface</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="mb-8">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF files only</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={loading}
              />
            </label>
          </div>
          {uploadStatus && (
            <p className={`mt-2 text-center ${
              uploadStatus.includes('Error') ? 'text-red-500' : 'text-green-500'
            }`}>
              {uploadStatus}
            </p>
          )}
        </div>

        <form onSubmit={handleQuery} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !uploadStatus.includes('successfully')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <MessageSquare className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>

        {response && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold mb-2">Response:</h2>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;