from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain.chains import RetrievalQA
from langchain_community.document_loaders import PyPDFLoader

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY')

class RAGSystem:
    def __init__(self, persist_directory: str = "./chroma_db"):
        """Initialize RAG system with OpenAI embeddings and Chroma vector store"""
        self.embeddings = OpenAIEmbeddings()
        self.chroma_dir = persist_directory
        
        self.vectorstore = Chroma(
            persist_directory=persist_directory,
            embedding_function=self.embeddings
        )
        
        self.llm = ChatOpenAI(temperature=0)
        
        # Text splitter for chunking documents
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=512,
            chunk_overlap=64
        )
    
    def process_document(self, file_path: str) -> None:
        """Process and store document in vector store"""
        loader = PyPDFLoader(file_path)
        document = loader.load()
        
        # Split document into chunks
        texts = self.text_splitter.split_documents(document)
        
        # Create Document objects with metadata
        documents = [
            Document(id=i, page_content=t.page_content, metadata=t.metadata or {})
            for i, t in enumerate(texts)
        ]
        
        # Add documents to vector store
        self.vectorstore.add_documents(documents)
    
    def query(self, question: str) -> str:
        """Query the system using RetrievalQA chain"""
        # Create retrieval QA chain
        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vectorstore.as_retriever(
                search_kwargs={"k": 3}  # Retrieve top 3 most relevant chunks
            ),
            return_source_documents=True
        )
        
        # Execute query and return result
        result = qa_chain.invoke({"query": question})
        return str(result['result'])