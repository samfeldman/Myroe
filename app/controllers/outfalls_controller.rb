class OutfallsController < ApplicationController
  def index
  	current_user
    @outfalls = Outfall.all
    render json: @outfalls
  end
end
