class Fish < ActiveRecord::Base
	validates :user_id, :lat, :long, :time_caught, :weather, :comments, presence: true
	belongs_to :user_id
end
