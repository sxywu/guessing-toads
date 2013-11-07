class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.integer :weight
      t.integer :height
      t.string :gender

      t.timestamps
    end
  end
end
