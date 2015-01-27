class UsersController < ApplicationController 

 before_action :validate!, except: [:new, :create, :update]

  def csoo
    current_user
  end

  def fishadvisory
    current_user
  end

  def edit
    current_user
    @user = User.find(params[:id])
  end

  def show
    current_user
    @user = User.find(params[:id])
    @fishes = @user.fish
  end

  def create
    current_user
    @user = User.new(user_params)
    if @user.save!
      session[:user_id] = @user.id
      redirect_to "/users/#{@user.id}"    
    else 
      flash[:alert] = @user.errors.full_messages
      redirect_to :back
    end
  end

  def update
    current_user
    @user = User.find(params[:id])
    if @current_user == @user
      if @user.update(user_params)
      flash[:notice] = "Updates saved!"
      else
      flash[:alert] = "Updates not saved; please try again."
      end
    else
      flash[:alert] = "You cannot alter other user's settings."
    end
    redirect_to :back
  end

  def destroy
    current_user
    @user = User.find(params[:id])
    if @current_user.id == @user.id
      @user.destroy
    else
      flash[:alert] = "You do not have permission to destroy this user."
      redirect_to :back
    end
    redirect_to '/'
  end

  def new
    current_user
    @user = User.new
  end

  private
      
      def user_params
        params.require(:user).permit(:email, :password, :username, :zipcode)
      end

end
