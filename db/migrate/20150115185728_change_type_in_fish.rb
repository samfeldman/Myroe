class ChangeTypeInFish < ActiveRecord::Migration
  def change
  	rename_column :fish, :type, :fish_type
  end
end
