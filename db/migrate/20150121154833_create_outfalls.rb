class CreateOutfalls < ActiveRecord::Migration
  def change
    create_table :outfalls do |t|
      t.string :site
      t.string :description
      t.string :lat
      t.string :lng
      t.string :percent_unsafe

      t.timestamps
    end
  end
end
