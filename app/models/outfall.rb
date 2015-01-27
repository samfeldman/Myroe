require 'csv'

class Outfall < ActiveRecord::Base
	def self.parse_data
	    CSV.foreach('./harbor_sampling_coordinates.csv', headers: true, col_sep:',') do |row|
			outfall = Outfall.new(
			site: row[1], 
			description: row[2],
			lng: row[3],
			lat: row[4],
			percent_unsafe: row[15],)
			if outfall.save
				p "yay"
			else 
				p "no"
			end
		end
	end
end
