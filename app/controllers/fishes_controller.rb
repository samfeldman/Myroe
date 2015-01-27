class FishesController < ApplicationController

  before_action :validate!

  def index
    current_user
    @fishes = Fish.all
    render json: @fishes
  end

  def show
    current_user
    @fish = Fish.find(params[:id])
    @fishes = Fish.where(user_id: params[:id])
    @user.where(fish.id).username
  end

  def new
    current_user
    @fish = Fish.new
    @fishes = Fish.where(user_id: @current_user.id)
  end

  def update
    current_user
    @fish = Fish.find(params[:id])
    @fishes = Fish.where(user_id: @current_user.id)
    if @current_user.id == @fish.user_id
      @fish.update(fish_params)
      flash[:notice] = "Updates saved!"
    else
      flash[:alert] = "Updates not saved; please try again."
    end
    redirect_to "/users/#{@current_user.id}"
  end

  def edit
    current_user
    @fish = Fish.find(params[:id])
    @fishes = Fish.where(user_id: @current_user.id)
  end

  def create
    current_user
    @fish = Fish.new(fish_params)
    if @fish.save!
      redirect_to "/users/#{@current_user.id}"   
    else 
      flash[:alert] = @fish.errors.full_messages
      redirect_to :back
    end
  end

  def destroy
    current_user
    @fish = Fish.find(params[:id])
    if @current_user.id == @fish.user_id
      @fish.destroy
    else
      flash[:alert] = "You do not have permission to destroy this catch."
    end
    redirect_to :back
  end

  private
        
    def fish_params
      params.require(:fish).permit(:user_id, :lat, :long, :fish_type, :number, :time_caught, :weather, :comments)
    end




end
