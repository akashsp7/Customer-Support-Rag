# RAG System with Flask & React

A full-stack Retrieval-Augmented Generation (RAG) system that allows users to upload PDF documents and query them using natural language. Built with Flask backend, React frontend, and powered by OpenAI embeddings and Chroma vector database.

## 🚀 Features

- **PDF Document Processing**: Upload and process PDF documents for intelligent querying
- **Vector Database Storage**: Uses ChromaDB for efficient document embedding storage
- **Natural Language Queries**: Ask questions about your documents in plain English
- **Real-time Responses**: Get instant answers based on document content
- **Modern Web Interface**: Clean, responsive React frontend with Tailwind CSS
- **RESTful API**: Well-documented Flask API endpoints

## 🛠️ Tech Stack

### Backend
- **Flask** - Web framework
- **LangChain** - LLM orchestration and document processing
- **ChromaDB** - Vector database for embeddings
- **OpenAI** - Embeddings and language model
- **PyPDF** - PDF document parsing

### Frontend
- **React** - Frontend framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- OpenAI API key

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd rag-system-project
```

### 2. Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
export OPENAI_API_KEY="your-openai-api-key-here"
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run build
cd ..
```

## 🚀 Usage

### Start the Application
```bash
# Run the Flask server (serves both API and frontend)
python app.py
```

The application will be available at `http://localhost:8080`

### Using the System

1. **Upload a PDF**: Click on the upload area and select a PDF document
2. **Wait for Processing**: The system will process and embed your document
3. **Ask Questions**: Type your question in the query box and press enter
4. **Get Answers**: Receive AI-generated responses based on your document content

## 📚 API Documentation

### Upload Document
```http
POST /api/upload
Content-Type: multipart/form-data

Body: file (PDF file)
```

**Response:**
```json
{
    "message": "File processed successfully"
}
```

### Query Document
```http
POST /api/query
Content-Type: application/json

{
    "query": "Your question here"
}
```

**Response:**
```json
{
    "response": "AI-generated answer based on document content"
}
```

## 🏗️ Project Structure

```
rag-system-project/
├── app.py                 # Flask application
├── rag_system.py         # RAG system implementation
├── requirements.txt      # Python dependencies
├── data/                 # Sample documents
├── uploads/             # Uploaded documents storage
└── frontend/            # React frontend
    ├── src/
    │   ├── App.js       # Main React component
    │   └── ...
    ├── build/           # Production build
    └── package.json     # Frontend dependencies
```

## 🔬 Key Components

### RAGSystem Class (`rag_system.py`)
- **Document Processing**: Handles PDF loading and text chunking
- **Vector Storage**: Manages ChromaDB operations
- **Query Processing**: Implements retrieval-augmented generation

### Flask Routes (`app.py`)
- **File Upload**: Secure PDF upload and processing
- **Query Endpoint**: Natural language query processing
- **Static Serving**: Serves React frontend

## 🛡️ Security Features

- **Secure File Upload**: Uses werkzeug's secure_filename
- **File Type Validation**: Only accepts PDF files
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🎯 Advanced Configuration

### Chunking Parameters
Modify text splitting in `rag_system.py`:
```python
self.text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,      # Adjust chunk size
    chunk_overlap=64     # Adjust overlap
)
```

### Vector Search Configuration
Adjust retrieval parameters:
```python
retriever=self.vectorstore.as_retriever(
    search_kwargs={"k": 3}  # Number of documents to retrieve
)
```

## 🧪 Sample Queries

Try these example queries with your uploaded documents:
- "What is the main topic of this document?"
- "Summarize the key findings"
- "What are the main recommendations?"
- "Explain the methodology used"

## 🚧 Development

### Running in Development Mode
```bash
# Backend (with auto-reload)
python app.py

# Frontend (separate terminal)
cd frontend
npm start
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ⚠️ Important Notes

- Ensure your OpenAI API key has sufficient credits
- Large PDF files may take longer to process
- The system persists embeddings in the `chroma_db` directory
- First-time setup requires building the React frontend

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.
