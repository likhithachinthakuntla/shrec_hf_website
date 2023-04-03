from huggingface_hub import HfApi, ModelFilter
import logging

class FetchModels:
    def __init__(self, datasetID, modelID, logger):
        self.datasetID = None
        pass

    def debug_print(self, stmt):
        print(stmt)

    """
    Display Model Info
    """

    def viewModelInfo(self,modelID):
        api = HfApi()
        model_info = api.list_models(
                filter=ModelFilter(
                    model_name = modelID
                ))
        self.debug_print(model_info)

    """
    Fetch All Models metadata from Hugging Face API
    """
    def showAllModels(self):
        api = HfApi()
        models = api.list_models()
        self.debug_print(len(models))
        for i,m in enumerate(models):
            if i<5:
                self.debug_print(m)
    
    """
    Categorize Models for selected Dataset.
    """
    def showModelsForDataset(self, dataset):
        api = HfApi()
        filt =ModelFilter(
                            task="text-classification",
                            library="tf",
                            trained_dataset=dataset
                        )
        models = api.list_models(filter=filt)
        self.debug_print(len(models))
        for i,m in enumerate(models):
            if i<5:
                self.debug_print(m)

    
    """
    Categorize Models based on certogories like task, license etc.
    """
    def showModelByCategory(self, filters):
        api = HfApi()
        filt = ModelFilter(
            task = filters['task']
        )
        models = api.list_models(filter=filt)
        self.debug_print(len(models))
        for i,m in enumerate(models):
            if i<5:
                self.debug_print(m)



if __name__ == '__main__':
    ds = FetchModels('yelp_review_full', None, logger=None)
    ds.showAllModels()
    ds.debug_print("\n +++++++++++ \n")
    ds.showModelsForDataset('yelp_review_full')
    ds.debug_print("\n +++++++++++ \n")
    ds.viewModelInfo('tokenizethathug/1percent_bert_base_uncased_100k')
    ds.debug_print("\n +++++++++++ \n")
    ds.showModelByCategory({'task':"text-classification"})
    ds.debug_print("\n +++++++++++ \n")
    #['license', 'library', 'task'],['mit',['pytorch', 'tf'], 'text-classification']
