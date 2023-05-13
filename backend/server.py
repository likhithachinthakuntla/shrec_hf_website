from flask import Flask
from fetchDatasets import FetchDatasets
from fetchModels import FetchModels

app = Flask(__name__)

fetchDatasets_routes = FetchDatasets('yelp_review_full', logger=None)
fetchModels_routes = FetchModels('yelp_review_full', None, logger=None)

fetchDatasets_routes.register_routes()
fetchModels_routes.register_routes()

app.register_blueprint(fetchDatasets_routes.fetchDatasets)
app.register_blueprint(fetchModels_routes.fetchModels)

if __name__ == '__main__':
    app.run()
