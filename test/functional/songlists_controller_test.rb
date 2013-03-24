require 'test_helper'

class SonglistsControllerTest < ActionController::TestCase
  setup do
    @songlist = songlists(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:songlists)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create songlist" do
    assert_difference('Songlist.count') do
      post :create, songlist: { artist: @songlist.artist, category: @songlist.category, label: @songlist.label, sid: @songlist.sid }
    end

    assert_redirected_to songlist_path(assigns(:songlist))
  end

  test "should show songlist" do
    get :show, id: @songlist
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @songlist
    assert_response :success
  end

  test "should update songlist" do
    put :update, id: @songlist, songlist: { artist: @songlist.artist, category: @songlist.category, label: @songlist.label, sid: @songlist.sid }
    assert_redirected_to songlist_path(assigns(:songlist))
  end

  test "should destroy songlist" do
    assert_difference('Songlist.count', -1) do
      delete :destroy, id: @songlist
    end

    assert_redirected_to songlists_path
  end
end
