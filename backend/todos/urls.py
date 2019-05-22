from django.urls import path


from . import views

urlpatterns = [
    path('', views.ListTodo.as_view()),
    path('<int:pk>/', views.todo_detail),
    path('addTodo/', views.addTodo)

]