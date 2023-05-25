from collections import Counter
from datasets import list_datasets, DatasetInfo, load_dataset
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.inspection import permutation_importance
import matplotlib.pyplot as plt
from sklearn.preprocessing import OneHotEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
import seaborn as sns
from flask import Blueprint


class Visualizer:
    # def _init_(self, datasetID):
    #     self.datasetID = datasetID
    #     self.visualizer = Blueprint('visualizer', __name__)
    #     pass

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
        
    def getDataSummary(df):
        
        
        df['id'] = df.index
        
        data_snapshot =  df.head(5).to_json(orient='records') 
        
        return data_snapshot

    def getClassDistribution(df, col):
        print("Getting Class Distribution Chart..")
        #print(df[col].value_counts())
        
        '''
        sns.barplot(data = df_graph, x = col, y = 'counts')
        plt.title(title)
        plt.show()
        '''
        
        df_graph = df.groupby(col).size().reset_index(name='counts')
        
        graph_dict =  df_graph.to_json(orient='records') 
        
        return graph_dict
    
        

    def displayAddedInfo(self,df, col, label):
        # plt.subplot(1,2,1)
        sns.boxplot(data = df, y=col, hue=label)
        plt.ylabel(col, labelpad=12.5)
        
        # plt.subplot(1,2,2)
        # sns.kdeplot(data = df, y=col, hue=label)
        # plt.legend(df[label].unique())
        # plt.xlabel('')
        # plt.ylabel('')
        
        plt.show()

        # df[col].plot(
        #                     kind='hist',
        #                     xTitle='rating',
        #                     linecolor='black',
        #                     yTitle='count',
        #                     title=title)
        return
    
    def getETLData(self, dataset_name):
        
        df = Visualizer.getData(dataset_name)
        bar_graph_json = Visualizer.getClassDistribution(df,'label')
        data_summary_json = Visualizer.getDataSummary(df)
                
        return {"bar_graph_json" : bar_graph_json, "data_summary_json" : data_summary_json}
    
    def register_routes(self):
        self.visualizer.add_url_rule('/getETLData', 'getETLData', self.getETLData)

# if __name__ == '__main__':
#     vis = Visualizer('yelp_review_full')
#     vis.getFeatureInstance()