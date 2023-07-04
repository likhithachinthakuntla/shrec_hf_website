#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jun 14 22:59:10 2023

@author: pranayreddy
"""

from pymongo import MongoClient
import datetime
import sys
import pandas as pd


class utilities:
    
    def test():
        
        print("Testing the function")
    
    def connectToDB():
        
        # Connect to MongoDB
        CONNECTION_STRING = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0"
    
        client = MongoClient(CONNECTION_STRING)
        
        db = client['e2e_ml_db']
        
        return db
    
    def setUpDB(db):
        
        collection = db['e2e_ml_datasets_db']
        document = {'name' : 'project', 'created_by' : 'pranay_reddy'}
        collection.insert_one(document)
        
        collection = db['e2e_ml_metadata_selected']
        document = {'name' : 'project', 'created_by' : 'pranay_reddy'}
        collection.insert_one(document)
        
        collection = db['e2e_ml_preprocessing_selected']
        document = {'name' : 'project', 'created_by' : 'pranay_reddy'}
        collection.insert_one(document)

    
    def saveDatatoDB(project_id,df,subset_name=None):
                
        db = utilities.connectToDB()
        
        chunk_size = 10 * 1024 * 1024
        
        num_chunks = sys.getsizeof(df) // chunk_size + 1
                
        df_list = df.values.tolist()
        columns = list(df.columns)
        
        num_rows_per_chunk = len(df_list) // num_chunks + 1
        
        chunks = [df_list[i:i+num_rows_per_chunk] for i in range(0, len(df_list), num_rows_per_chunk)]
        
        if subset_name == None:
        
            for i, chunk in enumerate(chunks):
                document = {'project_id' : project_id, 'chunk_number': i + 1, 'data': chunk, 'columns': columns, \
                            'created_by' : 'Pranay Reddy', 'created_on' : str(datetime.datetime.now())}
                    
                db.e2e_ml_datasets_db.insert_one(document)
        
        else:
            
            for i, chunk in enumerate(chunks):
                document = {'project_id' : project_id, 'subset_name' : subset_name, 'chunk_number': i + 1, 'data': chunk, 'columns': columns, \
                            'created_by' : 'Pranay Reddy', 'created_on' : str(datetime.datetime.now())}
                    
                db.e2e_ml_datasets_db.insert_one(document)
                
    
    def getDatafromDB(project_id, subset_name = None):
        
        db = utilities.connectToDB()
        
        if subset_name == "null":
        
            cursor = db.e2e_ml_datasets_db.find({'project_id' : project_id})
            
        else :
            
            cursor = db.e2e_ml_datasets_db.find({'project_id' : project_id, 'subset_name' : subset_name})
        
        chunks = []
        
        for document in cursor:
            chunks.extend(document['data'])
        
        columns = document['columns']
            
        df = pd.DataFrame(chunks,columns = columns)
        
        return df
    
          
    def saveMetaDatatoDB(project_id,prj_specs_dict):
        
        db = utilities.connectToDB()

        db.e2e_ml_metadata_selected.insert_one({'project_id' : project_id, \
        'meta_data' : prj_specs_dict, 'created_by' : 'Pranay Reddy', 'created_on' : str(datetime.datetime.now())})
            