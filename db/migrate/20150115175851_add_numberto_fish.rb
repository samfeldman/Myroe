class AddNumbertoFish < ActiveRecord::Migration
  def change
  	add_column :fish, :number, :integer
  end
end
