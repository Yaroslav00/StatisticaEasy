from django.contrib.auth.models import User, Group
from rest_framework import viewsets,permissions
from rest_framework.views import APIView,Response
from .serializers import UserSerializer, GroupSerializer, PointSerializer,FileSerializer
from .statistic_algorithms import simple_linear_regretion, neural_network_prediction
from django.shortcuts import render
from .models import Point, DataFile
import numpy as np

class regression_info(APIView):
    permission_classes = [permissions.AllowAny, ]
    def post(self,request):
        file_serializer = FileSerializer(data=request.data)
        
        if file_serializer.is_valid():
            file_serializer.save()

        return Response(status=200)
    def get(self,request):
        file = DataFile.objects.all()
        print(file)
        print(file[0].get_file_name())
       
        x = []
        y = []
        with open(file[0].get_file_name()) as f:
            for line in f:
                tmp = line.split(',')
                x.append(float(tmp[0]))
                y.append(float(tmp[1]))

        alpha,beta = simple_linear_regretion.least_squers_fit(x,y)
        chart_reg_y = [beta*point + alpha for point in x]
        chart_reg_x = [point for point in x]
       
        return Response([{'chart_reg_x':chart_reg_x},{'chart_reg_y':chart_reg_y},{'chart_x':x},{'chart_y':y}])

    
        
    


class main_page(APIView):

    def get(self,request):

        return render(request, '../templates/Index.html')


class info_demo_regression(APIView):
    permission_classes = [permissions.AllowAny, ]
    def post(self,request):
        print(request.data)
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
        return Response(status=200)

    def get(self,request):
        x = []
        y = []
        with open('media/dataset1.csv') as file:
            for line in file:
                tmp = line.split(',')
                x.append(float(tmp[0]))
                y.append(float(tmp[1]))

        alpha,beta = simple_linear_regretion.least_squers_fit(x,y)
        chart_reg_y = [beta*point + alpha for point in x]
        chart_reg_x = [point for point in x]
        
        return Response([{'chart_reg_x':chart_reg_x},{'chart_reg_y':chart_reg_y},{'chart_x':x},{'chart_y':y}])


class dnn_demo_info(APIView):
    permission_classes = [permissions.AllowAny, ]

    def post(self, request):
        print(request.data)
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
        return Response(status=200)

    def get(self, request):
        x = []
        y = []
        with open('media/dataset1.csv') as file:
            for line in file:
                tmp = line.split(',')
                x.append(float(tmp[0]))
                y.append(float(tmp[1]))

        np_y = np.array([[*y]])
        np_x = x
        chart_dnn_x, chart_dnn_y = neural_network_prediction.dnn_prediction(np_x,np_y)

        return Response([{'chart_dnn_x': chart_dnn_x}, {'chart_dnn_y': chart_dnn_y}, {'chart_x': x}, {'chart_y': y}])


class dnn_info(APIView):
    permission_classes = [permissions.AllowAny, ]

    def post(self, request):
        file_serializer = FileSerializer(data=request.data)

        if file_serializer.is_valid():
            file_serializer.save()

        return Response(status=200)

    def get(self, request):
        file = DataFile.objects.all()
        print(file)
        print(file[0].get_file_name())

        x = []
        y = []
        with open(file[0].get_file_name()) as f:
            for line in f:
                tmp = line.split(',')
                x.append(float(tmp[0]))
                y.append(float(tmp[1]))

        np_y = np.array([[*y]])
        np_x = x
        chart_dnn_x, chart_dnn_y = neural_network_prediction.dnn_prediction(np_x, np_y)
        
        return Response([{'chart_dnn_x': chart_dnn_x}, {'chart_dnn_y': chart_dnn_y}, {'chart_x': x}, {'chart_y': y}])

