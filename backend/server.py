
from flask import Flask, request
from fetchDatasets import FetchDatasets
from fetchModels import FetchModels
from ETL.visualizer import Visualizer
from Inference.infer import Infer
app = Flask(__name__)
fetchDatasets_routes = FetchDatasets('yelp_review_full')
fetchModels_routes = FetchModels('yelp_review_full', None, logger=None)
visualizer_routes = Visualizer()
inference_routes = Infer()
# fetchDatasets_routes.register_routes()
# fetchModels_routes.register_routes()
# app.register_blueprint(fetchDatasets_routes.fetchDatasets)
# app.register_blueprint(fetchModels_routes.fetchModels)
@app.route('/getDatasetStats/')
def get_dataset_stats():
    project_id = request.args.get('project_id')
    dataset_name = request.args.get('dataset_name')
    subset_name = request.args.get('subset_name')
    result = fetchDatasets_routes.getDatasetStats(project_id, dataset_name, subset_name)
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

# @app.route('/getETLData/')
# def get_ETL_data():
#     dataset_name = request.args.get('dataset_name')
#     result = visualizer_routes.getETLData(dataset_name)
#     return result
@app.route('/showSubDatasetsForDataset/')
def show_sub_datasets_for_dataset():
    dataset_name = request.args.get('dataset_name')
    result = fetchDatasets_routes.showSubDatasetsForDataset(dataset_name)
    return result

@app.route('/getDataSummary/')
def getDataSummary():
    project_id = request.args.get('project_id')
    subset_name = request.args.get('subset_name')
    result = visualizer_routes.getDataSummary(project_id, subset_name)
    return result

@app.route('/getClassDistribution/')
def getClassDistribution():
    project_id = request.args.get('project_id')
    subset_name = request.args.get('subset_name')
    result = visualizer_routes.getClassDistribution(project_id, subset_name, None)
    return result

@app.route('/plotTopStopWords/')
def plotTopStopWords():
    project_id = request.args.get('project_id')
    subset_name = request.args.get('subset_name')
    result = visualizer_routes.plotTopStopWords(project_id, subset_name, None)
    return result

@app.route('/getTopngram/')
def getTopngram():
    project_id = request.args.get('project_id')
    subset_name = request.args.get('subset_name')
    result = visualizer_routes.getTopngram(project_id, subset_name, 2, None)
    return result

@app.route('/getInferStats/')
def getInferStats():
    modelID = request.args.get('modelID')
    result = inference_routes.get_infer_stats(modelID)
    return result

@app.route('/getPredictions/')
def getPredictions():
    modelID = request.args.get('modelID')
    device_name = request.args.get('device_name')
    input = request.args.get('input')
    result = inference_routes.get_predictions(modelID, device_name, input)
    return result

if __name__ == '__main__':
    app.run()
