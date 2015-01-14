class CreateFish < ActiveRecord::Migration
  def change
    create_table :fish do |t|
      t.integer :user_id
      t.string :lat
      t.string :long
      t.datetime :time_caught
      t.string :weather
      t.string :comments

      t.timestamps
    end
  end
end
