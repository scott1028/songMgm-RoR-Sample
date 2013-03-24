class Songlist < ActiveRecord::Base
  attr_accessible :artist, :category, :label, :sid

  #def categories
  #	categories=self.class.select(:category).group(:category)
  #	r=[]
  #	categories.each do |c|
  #		r<<c.category
  #	end
  #	r
  #end
  #
  #def as_json(options=nil)
  #	h=super
  #	h[:categories]=self.categories
  #	h
  #end
end
