class PersonController < ApplicationController
  def home
  end

  def index
    @people = Person.all
    render :json => @people
  end

  def create
    @person = Person.create(person_params)
    render nothing: true
  end

  private

  def person_params
    params.require(:person).permit(:weight, :height, :gender)
  end
end
