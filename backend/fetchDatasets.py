from datasets import list_datasets, load_dataset
import pandas as pd
import sys
import requests
import utilities as ut
import uuid
import os

project_id = str(uuid.uuid4())

class FetchDatasets:
    
    def __init__(self, applicationType):
        self.applicationType = applicationType

    """
    Display snapshot of selected Dataset
    """

    def viewDataSnapshot(self):
        
        data = load_dataset(self.datasetID)
        snapshpt = data['train'][0:len(data['train'])]
        pdata = pd.DataFrame(snapshpt)
        
        return pdata

    def getDatasetStats(self, project_id, dataset_name, subset_name):

        if(subset_name == "null"):
            data = pd.DataFrame(load_dataset(dataset_name, split='train'))
            data.rename(columns={data.columns[0] : 'text'})
            ut.utilities.saveDatatoDB(project_id,data)
            
        else:
            data = pd.DataFrame(load_dataset(dataset_name,subset_name, split='train'))
            data.rename(columns={data.columns[0] : 'text'},inplace=True)
            ut.utilities.saveDatatoDB(project_id,data,subset_name)
        
        stats = {'Name': dataset_name,
                 'Size': str(round(sys.getsizeof(data)/(1024 * 1024),2)) + ' MB',
                 'NumInstances': len(data),
                 'type': 'Supervised'
                 }
        
        return stats

    """
    Fetch All Datasets metadata from Hugging Face API
    """

    def getAllDatasets(self):
        
        application = 'text-classification'

        url = f"https://huggingface.co/api/matching-models-tags?pipeline_tag={application}&type=dataset"

        response = requests.get(url)
        
        if response.status_code == 200 :
            
            datasets = response.json()['matchingTags']
        
            for i in range(0, len(datasets)):
                datasets[i] = datasets[i].replace('dataset:','')
            
            return datasets

    def showAllDatasets(self):
        datas = list_datasets(with_community_datasets=True, with_details=True)
        self.debug_print("TOTAL NUMBER OF DATASETS FETCHED = {}\n".format(len(datas)))
        for i, data in enumerate(datas):
            self.debug_print("============== DATASET {} =======================".format(i+1))
            self.debug_print(data)
            self.debug_print("==================================================\n")
            if i == 100:
                break
            
    def showSubDatasetsForDataset(self,dataset_name):
        
        url = f"https://datasets-server.huggingface.co/splits?dataset={dataset_name}"
        
        response = requests.get(url)
        
        subsets = []
        
        if response.status_code == 200 :
            
            response_subsets = response.json()['splits']
            
            for i in range(0, len(response_subsets)):
                if (response_subsets[i]['config'] not in subsets and response_subsets[i]['split'] == 'train'):
                    subsets.append(response_subsets[i]['config'])
            
            if len(subsets) == 1 :
                subsets = []
                
        return subsets

    def showAllDatasets(self):
        datas = list_datasets(with_community_datasets=True, with_details=True)
        self.debug_print("TOTAL NUMBER OF DATASETS FETCHED = {}\n".format(len(datas)))
        for i, data in enumerate(datas):
            self.debug_print("============== DATASET {} =======================".format(i+1))
            self.debug_print(data)
            self.debug_print("==================================================\n")
            if i == 100:
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
    
            if count == 100:
                break
        
    def register_routes(self):
        self.fetchDatasets.add_url_rule('/getAllDatasets', 'getAllDatasets', self.getAllDatasets)
        self.fetchDatasets.add_url_rule('/getDatasetStats', 'getDatasetStats', self.getDatasetStats)

