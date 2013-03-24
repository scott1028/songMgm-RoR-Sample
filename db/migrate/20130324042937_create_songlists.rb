class CreateSonglists < ActiveRecord::Migration
  def change
    create_table :songlists do |t|
      t.string :sid
      t.string :category
      t.string :label
      t.string :artist

      t.timestamps
    end
  end
end
