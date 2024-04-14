# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
token = '4380f36fda304251bf48f12ad4474b6d11447f1f959bd5b77a5d56c92b97f4c403ee0ae13d31a85ed88058ff8795bf31ec17e70e5c229b3707a77a2ee7e81cc'

if Dummy::Application.config.respond_to?(:secret_key_base=)
  Dummy::Application.config.secret_key_base = token
else
  Dummy::Application.config.secret_token = token
end