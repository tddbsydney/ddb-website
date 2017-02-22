#!/usr/bin/env ruby
require 'prismic'
require 'net/http'
require 'json'
require 'time'  # json parsing????

class DataImporter
  def self.import()
    # Import data from Prismic.io using:
    # https://github.com/prismicio/ruby-kit
    puts "\n>> Starting Prismic.io data importer..."

    # Generate configuration settings
    config = JSON.parse('{
      "endpoint": "http://ddb-website.cdn.prismic.io/api"
    }')

    # Create Prismic API object
    @prismic_api ||= ::Prismic.api(config["endpoint"], {
      :access_token => config["access_token"],
      :cache => ::Prismic::BasicNullCache.new
    })

    # Get raw data from Prismic.io
    begin
      url = config["endpoint"] + "/documents/search?ref=#{@prismic_api.master_ref.ref}&format=json&pageSize=100"
      puts ">> Querying '#{url}'..."
      uri = URI(url)
      response = Net::HTTP.get(uri)
      resp = JSON.parse(response)

      # Print raw data
      File.open("./_data/_prismic.json", "w") do |f|
        f.write( JSON.pretty_generate(resp) )
      end

      # Format data and write it into prismic.json
      docs = {}
      resp["results"].each do |result|
        doc = {
          :uid => result["uid"],
          # :data => result["data"][result["type"]]
        }

        frags = extractFragments(result["data"][result["type"]])
        doc["data"] = frags

        if not docs.key?(result["type"])
          docs[result["type"]] = []
        end
        docs[result["type"]] << doc
      end

      File.open("./_data/prismic.json", "w") do |f|
        f.write( JSON.pretty_generate(docs) )
      end

      puts ">> Got some data!  (#{resp["results"].length} pages)\n\n"
      return resp["results"]
    rescue => e
      puts ">> Failed to get data!!"
      puts "\n>> ERROR: \n#{e}\n\n"
      return nil
    end

    return nil
  end

  # Parse hash table of fragments
  def self.extractFragments(fragments)
    list = {}
    fragments.each do |name, value|
      if value["type"] != "SliceZone"
        list[name] = {
          :type => value["type"],
          :value => value["value"]
        }
      else
        arr = []
        value["value"].each do |val|
          arr << {
            :type => val["slice_type"],
            :value => val["value"]["value"]
          }
        end
        list[name] = {
          :type => "SectionList",
          :value => arr
        }
      end
    end
    return list
  end
end

DataImporter.import()
