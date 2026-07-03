desc "Generate diagrams from Mermaid files"
task :diagrams do
  require 'fileutils'
  
  mermaid_dir = '_mermaid'
  output_dir = 'assets/images/diagrams'
  
  FileUtils.mkdir_p(svg_dir)
  
  Dir.glob("#{mermaid_dir}/*.mmd").each do |mmd_file|
    output_file = File.join(output_dir, File.basename(mmd_file, '.mmd') + '.png')
    sh "mmdc -p /tmp/puppeteer.json -c config/mermaid.config.json -i #{mmd_file} -o #{output_file} --scale 3"
  end

  puts "Generated #{Dir.glob("#{output_dir}/*.png").length} diagrams"
end

desc "Default task: generate diagrams"
task default: [:diagrams]
