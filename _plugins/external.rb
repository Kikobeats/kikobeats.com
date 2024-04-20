Jekyll::Hooks.register :posts, :pre_render do |post|
  if post.data['external']
    post.data['published'] = false
  end
end
