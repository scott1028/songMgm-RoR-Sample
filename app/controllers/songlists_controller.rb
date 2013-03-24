class SonglistsController < ApplicationController
  # GET /songlists
  # GET /songlists.json
  def index
    @songlists = if params[:keyword].to_s!=''
      Songlist.where("label like '%"+params[:keyword]+"%'")
    else
      Songlist
    end

    (@songlists = @songlists.where(:sid=>'0'*(5-params[:sid].to_s.length)+params[:sid].to_s)) if params[:sid].to_s!=''
    (@songlists = @songlists.where(:category=>params[:category])) if params[:category].to_s!=''

    @songlists = @songlists.order(:sid).limit(200)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @songlists }
    end
  end

  # GET /songlists/1
  # GET /songlists/1.json
  def show
    @songlist = Songlist.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @songlist }
    end
  end

  # GET /songlists/new
  # GET /songlists/new.json
  def new
    @songlist = Songlist.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @songlist }
    end
  end

  # GET /songlists/1/edit
  def edit
    @songlist = Songlist.find(params[:id])
  end

  # POST /songlists
  # POST /songlists.json
  def create
    @songlist = Songlist.new(params[:songlist])

    respond_to do |format|
      if @songlist.save
        format.html { redirect_to @songlist, notice: 'Songlist was successfully created.' }
        format.json { render json: @songlist, status: :created, location: @songlist }
      else
        format.html { render action: "new" }
        format.json { render json: @songlist.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /songlists/1
  # PUT /songlists/1.json
  def update
    @songlist = Songlist.find(params[:id])

    respond_to do |format|
      if @songlist.update_attributes(params[:songlist])
        format.html { redirect_to @songlist, notice: 'Songlist was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @songlist.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /songlists/1
  # DELETE /songlists/1.json
  def destroy
    @songlist = Songlist.find(params[:id])
    @songlist.destroy

    respond_to do |format|
      format.html { redirect_to songlists_url }
      format.json { head :no_content }
    end
  end
end
