import sklearn
import numpy as np

X = np.array([2,4,1,6,7,3,1,9,10,11])
Y = np.array([4,16,1,36,49,9,1,81,100,121])
predictor = sklearn.neural_network.MLPRegressor(hidden_layer_sizes=(50,100),activation='relu',max_iter=500)
predictor.fit(X,Y)
print(predictor.predict(np.array([3,4])))

