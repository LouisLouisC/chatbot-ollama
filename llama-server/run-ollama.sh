#!/usr/bin/env bash
 
ollama serve &
ollama list
ollama pull llama3.2:3b

ollama serve&
ollama list
ollama pull llama3.2:1b