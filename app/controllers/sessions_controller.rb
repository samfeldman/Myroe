class SessionsController < ApplicationController

	def index
		current_user
		if @current_user != nil
      		redirect_to "/users/#{@current_user.id}" 
    	end
	end

	def new
		current_user
		@user = User.new
		if @current_user != nil
      		redirect_to "/users/#{@current_user.id}" 
    	end
 	end

	def create
		current_user
		@user = User.where(email: user_params[:email]).first
		if @user && @user.password == user_params[:password]
			session[:user_id] = @user.id
			redirect_to "/users/#{@user.id}"
		elsif @user == nil
			flash[:alert] = "User doesn't exist, please try again."
			redirect_to '/sessions/new'
		else 
			flash[:alert] = "Correct your passwords and try again."
			redirect_to '/sessions/new'
		end
	end

	def destroy
		session[:user_id] = nil
	 	redirect_to "/"
	end

	private
		
		def user_params
	    params.require(:user).permit(:email, :password, :username)
		end

end
