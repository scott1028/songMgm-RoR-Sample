class Songlist < ActiveRecord::Base
  attr_accessible :artist, :category, :label, :sid
end
