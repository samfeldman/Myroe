class SessionsController < ApplicationController

	def index
	end

	def new
 	end

	def create
		current_user
		@user = User.where(email: user_params[:email]).first
		if @user && @user.password == user_params[:password]
			session[:user_id] = @user.id
			redirect_to "/users/#{@user.id}"
		else 
			flash[:alert] = "login failed; please try again."
			redirect_to "/"
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
