class Person < ActiveRecord::Base

  validates :weight, :height, :gender, presence: true
  validates :weight, :height, numericality: {only_integer: true}
  validates :gender, format: { with: /\A[FM]\Z/ }
end
