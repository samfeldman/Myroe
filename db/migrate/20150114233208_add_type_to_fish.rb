class AddTypeToFish < ActiveRecord::Migration
  def change
  	add_column :fish, :type, :string
  end
end
