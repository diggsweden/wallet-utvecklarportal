desc "Generate PNG diagrams from Mermaid files"
task :diagrams do
  require 'fileutils'
  
  mermaid_dir = '_mermaid'
  png_dir = 'assets/images/diagrams'
  
  FileUtils.mkdir_p(png_dir)
  
  Dir.glob("#{mermaid_dir}/*.mmd").each do |mmd_file|
    png_file = File.join(png_dir, File.basename(mmd_file, '.mmd') + '.png')
    sh "mmdc -p /tmp/puppeteer.json -c config/mermaid.config.json -i #{mmd_file} -o #{png_file} --scale 3"
  end
  
  puts "Generated #{Dir.glob("#{png_dir}/*.png").length} PNG diagrams"
end

desc "Default task: generate diagrams"
task default: [:diagrams]
