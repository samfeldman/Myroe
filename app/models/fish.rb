class Fish < ActiveRecord::Base
	validates :user_id, :lat, :long, :weather, :comments, :fish_type, :number, presence: true
	belongs_to :user
end
