#!/usr/bin/env bash
 
ollama serve &
ollama list
ollama pull llama3.1:8b
 
ollama serve &
ollama list
ollama pull llama3.2:3b