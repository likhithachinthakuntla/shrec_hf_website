from datasets import list_datasets, DatasetInfo, load_dataset
import pandas as pd
import logging

class FetchDatasets:
    def __init__(self, datasetID, logger):
        self.datasetID = None
        pass

    def debug_print(self, stmt):
        print(stmt)

    """
    Display snapshot of selected Dataset
    """

    def viewDataSnapshot(self):
        data = load_dataset(self.datasetID, split="train")
        pdata = pd.DataFrame(data)
        self.debug_print(pdata)

    """
    Fetch All Datasets metadata from Hugging Face API
    """
    def showAllDatasets(self):
        datas = list_datasets(with_community_datasets=True, with_details=True)
        self.debug_print("TOTAL NUMBER OF DATASETS FETCHED = {}\n".format(len(datas)))
        for i, data in enumerate(datas):
            self.debug_print("============== DATASET {} =======================".format(i+1))
            self.debug_print(data)
            self.debug_print("==================================================\n")
            if i == 5:
                break
    
    """
    Categorize Datasets based on certogories like task, license etc.
    """
    def showDatasetByCategory(self, catype, cat):
        count = 0
        for i, dset in enumerate(list_datasets(with_details=True)):
            # self.debug_print(dset.tags[0])
            if str(catype)+':'+str(cat) in dset.tags:
                count+=1
                self.debug_print("DATASET INFO:======\n ", dset.tags)
                self.debug_print("==================================================\n")
            if count == 10:
                break
        

if __name__ == '__main__':
    ds = FetchDatasets('yelp_review_full',logger=None)
    ds.showAllDatasets()
    ds.debug_print("\n +++++++++++ \n")
    ds.showDatasetByCategory('license','mit')
