"""
URL configuration for lotr_proj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/dev_areas/', include("dev_area_app.urls")),
    path('api/v1/dev_characters/', include("dev_character_app.urls")),
    path('api/v1/dev_dialogue_options/', include("dev_dialogue_options_app.urls")),
    path('api/v1/dev_inventory_items/', include("dev_inventory_item_app.urls")),
    path('api/v1/dev_npc_dialogue/', include("dev_npc_dialogue_app.urls")),
    path('api/v1/dev_quests/', include("dev_quest_app.urls")),
    path('api/v1/dev_starting_inventory/', include("dev_starting_inventory_app.urls")),
    path('api/v1/dev_subquests/', include("dev_subquest_app.urls")),
    path('api/v1/game_areas/', include("game_area_app.urls")),
    path('api/v1/game_characters/', include("game_character_app.urls")),
    path('api/v1/game_dialogue_options/', include("game_dialogue_options_app.urls")),
    path('api/v1/game_inventory/', include("game_inventory_app.urls")),
    path('api/v1/game_quests/', include("game_quest_app.urls")),
    path('api/v1/game_stats/', include("game_stats_app.urls")),
    path('api/v1/game_subquests/', include("game_subquest_app.urls")),
    path('api/v1/saved_games/', include("saved_game_app.urls")),
    path('api/v1/settings/', include("settings_app.urls")),
    path('api/v1/users/', include("user_app.urls")),
    path('api/v1/the_one_api/', include("the_one_app.urls")),
]
