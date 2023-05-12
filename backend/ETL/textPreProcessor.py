import pandas as pd
import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.stem import PorterStemmer 
import spacy
from cleantext import clean
from unidecode import unidecode
import numpy as np
nlp = spacy.load("en_core_web_sm")
# These below download files are  required only once
nltk.download('omw-1.4')
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')



class TextPreProcessor:
    def __init__(self, text):
        

        self.stop_words = set(stopwords.words('english'))
        self.text = text
    
    def word_count(self, text):
        review_list = text.split()
        return len(review_list)

    def addInfo(self, col, df):
        print("Data Length")
        df['Length'] = df[col].str.len()
        print("Word count..")
        df['Word_count'] = df[col].apply(self.word_count)
        print("Mean Word length..")
        df['mean_word_length'] = df[col].map(lambda rev: np.mean([len(word) for word in rev.split()]))
        print("Mean Sentence length..")
        df['mean_sent_length'] = df[col].map(lambda rev: np.mean([len(sent) for sent in sent_tokenize(rev)]))
        return df
    
    def lower_text(self):
        # Convert into lowercase
        return self.text.lower()
    
    def remove_url(self):
        # Remove URLs from the text
        return re.sub(r'http\S+', '', self.text)

    def remove_html(self):
        # Remove HTML tags from text
        clean = re.compile('<.*?>')
        return re.sub(clean, '', self.text)
    
    def remove_numbers_spaces_symbols(self):
        # Remove the numbers
        self.text = unidecode(self.text)
        self.text = re.sub(r'[^\w]', ' ', self.text)
        self.text = re.sub(r'(\w+) \1', r'\1', self.text, flags=re.IGNORECASE)
        self.text = " ".join(self.text.split())
        return re.sub(r'\d+', '', self.text)
    
    def remove_punctuation(self):
        # Remove the punctuation
        return self.text.translate(str.maketrans('', '', string.punctuation))

    def tokenize_text(self, text):
        # Tokenize the text
        return word_tokenize(text)
    
    def remove_emojis(self):
        return clean(self.text, no_emoji=True)
    
    def remove_stopwords(self, tokens):
        # Remove the stop words
        tokens = [token for token in tokens if token not in self.stop_words]
        return tokens

    def lemmatize_text(self, tokens):
        # Lemmatize the text
        lemmatizer = WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(token) for token in tokens]
        # Join tokens back into a string
        lemmas = ' '.join(tokens)
        return lemmas

    def stem_text(self, tokens):
        # Join tokens back into a string
        stemmer = PorterStemmer()
        tokens = [stemmer.stem(token) for token in tokens]
        stems = ' '.join(tokens)
        return stems
    
    def spacy_lemmatize(self):
        doc = nlp(self.text)
        # Create a list of lemmatized tokens
        lemmas = [token.lemma_ for token in doc]
        # Join the lemmatized tokens into a single string
        lemmatized_text = " ".join(lemmas)
        return lemmatized_text