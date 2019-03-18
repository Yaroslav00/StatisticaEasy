from django.contrib.auth.models import User, Group
from rest_framework import viewsets,permissions
from rest_framework.views import APIView,Response
from .serializers import UserSerializer, GroupSerializer, PointSerializer,FileSerializer
from .statistic_algorithms import simple_linear_regretion
from django.shortcuts import render
from .models import Point


class linear_regretion(APIView):


    def get(self,request):
        points = request.GET.get('test_points')
        test_points = []
        for i in points:
            point = PointSerializer(points[i])
            test_points.append(point)
        new_point = request.GET.get('new_points')
        test_points.sort()
        alpha, beta, y = simple_linear_regretion.main(test_points, new_point)
        chart_x = [beta*point.x + alpha for point in test_points]
        chart_y = [point.y for point in test_points]
        prediction_y = y
        return Response({'chart_x': chart_x, 'chart_y': chart_y, 'prediction_y': prediction_y})


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



