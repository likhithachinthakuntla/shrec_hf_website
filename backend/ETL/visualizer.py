from datasets import load_dataset
import pandas as pd
from sklearn.impute import SimpleImputer
import matplotlib.pyplot as plt
from sklearn.preprocessing import OneHotEncoder
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
import seaborn as sns
import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')
from collections import defaultdict

import sys
sys.path.append('..')
print(sys.path)
import utilities as ut

stop=set(stopwords.words('english'))


class Visualizer:

    def getFeatureInstance(self):
        
        # df = pd.DataFrame(load_dataset(self.datasetID,split='train'))

        data = load_dataset(self.datasetID)
        df = data['train'][0:len(data['train'])]
        
        categorical_preprocessing = OneHotEncoder(handle_unknown='ignore')
        numeric_preprocessing = SimpleImputer(strategy='mean')
        text_preprocessing_cv =  CountVectorizer()

        text_tfid = text_preprocessing_cv.fit_transform(['text']).toarray()
        
        num = numeric_preprocessing.fit_transform(df['label'].values.reshape(-1, 1))

        data = np.concatenate((num,text_tfid), axis=1)
        cols =  np.concatenate((text_preprocessing_cv.get_feature_names())) # New cols name

        encoded = pd.DataFrame(data, columns=cols) # Encoded DataFrame with col name
        print(encoded)
        
    def getData(datasetID):
        
        df = pd.DataFrame(load_dataset(datasetID,split='train'))
        return df
        
    def getDataSummary(self,project_id, subset_name):
        
        df = ut.utilities.getDatafromDB(project_id, subset_name)
        
        df['id'] = df.index
        
        data_snapshot =  df.head(5).to_json(orient='records') 
        
        return data_snapshot

    def getClassDistribution(self,project_id, subset_name, col=None):
        print("Getting Class Distribution Chart..")
        #print(df[col].value_counts())
        
        '''
        sns.barplot(data = df_graph, x = col, y = 'counts')
        plt.title(title)
        plt.show()
        '''
        
        df = ut.utilities.getDatafromDB(project_id, subset_name)
        col = 'label'
        df_graph = df.groupby(col).size().reset_index(name='counts')
        
        graph_dict =  df_graph.to_json(orient='records') 
        
        return graph_dict
    
    
    def plotTopStopWords(self,project_id, subset_name, col=None):
        
        df = ut.utilities.getDatafromDB(project_id, subset_name)
        
        corpus=[]
        col = df.columns[0]
        new = df[col].str.split()
        new = new.values.tolist()
        corpus=[word for i in new for word in i]
        
        dic=defaultdict(int)
        
        for word in corpus:
            if word in stop:
                dic[word] += 1
                
        dict_df = pd.DataFrame(list(dic.items()),columns=['stop_word','count'])\
                  .sort_values('count', ascending=False).reset_index(drop=True).head(20)
              
        return dict_df.to_json(orient='records')
    
    
    def getTopngram(self,project_id, subset_name, n=2, col=None):
        
        df = ut.utilities.getDatafromDB(project_id, subset_name)
        
        corpus=[]
        col = df.columns[0]
        new = df[col].str.split()
        new = new.values.tolist()
        corpus=[word for i in new for word in i]
        
        vec = CountVectorizer(ngram_range=(n, n)).fit(corpus)
        bag_of_words = vec.transform(corpus)
        sum_words = bag_of_words.sum(axis=0) 
        words_freq = [(word, sum_words[0, idx]) 
                      for word, idx in vec.vocabulary_.items()]
        words_freq =sorted(words_freq, key = lambda x: x[1], reverse=True)
        
        words_freq_df = pd.DataFrame(words_freq, columns=['n_gram','count']).head(20)
        
        return words_freq_df.to_json(orient='records')
        

    def displayAddedInfo(self,df, col, label):
        # plt.subplot(1,2,1)
        sns.boxplot(data = df, y=col, hue=label)
        plt.ylabel(col, labelpad=12.5)
        
        plt.show()

        return
    
    # def getETLData(self, dataset_name):
        
    #     df = Visualizer.getData(dataset_name)
    #     bar_graph_json = Visualizer.getClassDistribution(df,'label')
    #     data_summary_json = Visualizer.getDataSummary(df)
    #     top_stop_words_json = Visualizer.plotTopStopWords(df)
    #     top_two_grams_json = Visualizer.getTopngram(df,2)
                
    #     return {"bar_graph_json" : bar_graph_json, "data_summary_json" : data_summary_json,\
    #             "top_stop_words_json" : top_stop_words_json, "top_two_grams_json" : top_two_grams_json}
    
    def register_routes(self):
        # self.visualizer.add_url_rule('/getETLData', 'getETLData', self.getETLData)
        self.visualizer.add_url_rule('/getDataSummary', 'getDataSummary', self.getDataSummary)
        self.visualizer.add_url_rule('/getClassDistribution', 'getClassDistribution', self.getClassDistribution)
        self.visualizer.add_url_rule('/plotTopStopWords', 'plotTopStopWords', self.plotTopStopWords)
        self.visualizer.add_url_rule('/getTopngram', 'getTopngram', self.getTopngram)


# if __name__ == '__main__':
#     vis = Visualizer('yelp_review_full')
#     vis.getFeatureInstance()