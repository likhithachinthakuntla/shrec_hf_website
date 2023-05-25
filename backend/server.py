
from flask import Flask, request
from fetchDatasets import FetchDatasets
from fetchModels import FetchModels
from ETL.visualizer import Visualizer
app = Flask(__name__)
fetchDatasets_routes = FetchDatasets('yelp_review_full', logger=None)
fetchModels_routes = FetchModels('yelp_review_full', None, logger=None)
visualizer_routes = Visualizer()
# fetchDatasets_routes.register_routes()
# fetchModels_routes.register_routes()
# app.register_blueprint(fetchDatasets_routes.fetchDatasets)
# app.register_blueprint(fetchModels_routes.fetchModels)
@app.route('/getDatasetStats/')
def get_dataset_stats():
    dataset_name = request.args.get('dataset_name')
    result = fetchDatasets_routes.getDatasetStats(dataset_name)
    return result
@app.route('/getAllDatasets/')
def get_all_datasets():
    result = fetchDatasets_routes.getAllDatasets()
    return result
@app.route('/showModelsForDataset/')
def show_models_for_dataset():
    dataset_name = request.args.get('dataset_name')
    result = fetchModels_routes.showModelsForDataset(dataset_name)
    return result
@app.route('/getETLData/')
def get_ETL_data():
    dataset_name = request.args.get('dataset_name')
    result = visualizer_routes.getETLData(dataset_name)
    return result
if __name__ == '__main__':
    app.run()
