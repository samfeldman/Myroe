class OutfallsController < ApplicationController

 before_action :validate!

  def index
  	current_user
    @outfalls = Outfall.all
    render json: @outfalls
  end
  
end
