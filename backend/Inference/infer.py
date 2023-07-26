from transformers import pipeline
import tensorflow as tf

# devices = {'name':'id'}
class Infer:
    # def __init__(self, modelID, deviceID, input): # "cuda:0, cuda:1"
    #     self.modelID = modelID
    #     self.deviceID = deviceID
    #     self.input = input

    def get_infer_stats(self, modelID):
        stats = {'modelName': modelID,
                 'inferenceTask': "Text-classification",
                'infrastructure': 'CPU',
                "inputType": 'text'}
        return stats

    def get_predictions(self, modelID, device_name, input):

        if device_name.endswith('CPU'):
            deviceID = 'cpu'
        else:
            deviceID = 'cpu'

        generator = pipeline("text-classification", model=modelID, device=deviceID)
        preds = generator(input)
        
        return preds[0]
    
    def register_routes(self):
        self.visualizer.add_url_rule('/get_infer_stats', 'get_infer_stats', self.get_infer_stats)
        self.visualizer.add_url_rule('/get_predictions', 'get_predictions', self.get_predictions)


# if __name__ == '__main__':
#     inf = Infer("distilbert-base-uncased-finetuned-sst-2-english", 'CPU','This restaurant has terrible food')
#     print(inf.get_predictions("distilbert-base-uncased-finetuned-sst-2-english", 'CPU','This restaurant has terrible food'))

