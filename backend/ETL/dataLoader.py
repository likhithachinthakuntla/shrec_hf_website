from datasets import load_dataset
from visualizer import Visualizer
from textPreProcessor import TextPreProcessor
import pandas as pd
import uuid

class DataLoader:
    def __init__(self, projID, datasetID):
        self.projID = projID
        self.datasetID = datasetID

    # import data from Hugging Face Zoo
    def fromHuggingFace(self):
        print("Loading dataset...")
        data = load_dataset(self.datasetID)
        print("Getting Train & Test data...")
        df_train = pd.DataFrame(data['train'][0:len(data['train'])])
        print(df_train.head(10))
        df_test = pd.DataFrame(data['test'][0:len(data['test'])])
        print("Saving to Cloud...")
        # df_train.to_csv(str(self.projID)+"_trainData.csv")
        # df_test.to_csv(str(self.projID)+"_testData.csv")
        print(df_train.shape, df_test.shape)
        return df_train
    
    # Read a local csv file
    def fromCSV(self):
        data = pd.read_csv(datasetID)
        return data
    
    # Read from Github repo
    def fromGitRepo(self):
        pass


    
if __name__ == '__main__':
    projID = uuid.uuid1(88)
    print(projID)
    datasetID = 'yelp_review_full'
    sourceID = 'hf'
    dloader = DataLoader(projID, datasetID)
    if sourceID == 'hf':
        df = dloader.fromHuggingFace()
    vis = Visualizer('yelp_review_full')
    vis.getClassDistribution(df, 'label', 'rating distribution')
    processor = TextPreProcessor(df)
    df = processor.addInfo('text',df)
    print(df.head(10))
    # df['Length'] = df['text'].str.len()
    # df['Word_count'] = df['text'].apply(word_count)
    # df['mean_word_length'] = df['Review'].map(lambda rev: np.mean([len(word) for word in rev.split()]))
    features = df.columns.tolist()[2:]
    print(features)
    for feature in features:
        vis.displayAddedInfo(df,feature, 'label')




