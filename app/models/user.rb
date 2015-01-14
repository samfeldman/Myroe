class User < ActiveRecord::Base

	validates :password, :email, :username, presence: true
	validates :password, confirmation: true
	validates :password, length: {minimum: 6}
	validates :email, uniqueness: true

	has_many :fish, dependent: :destroy

end
