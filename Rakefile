desc "Generate SVG diagrams from Mermaid files"
task :diagrams do
  require 'fileutils'
  
  mermaid_dir = '_mermaid'
  svg_dir = 'assets/images/diagrams'
  
  FileUtils.mkdir_p(svg_dir)
  
  Dir.glob("#{mermaid_dir}/*.mmd").each do |mmd_file|
    svg_file = File.join(svg_dir, File.basename(mmd_file, '.mmd') + '.svg')
    sh "mmdc -p /tmp/puppeteer.json -c config/mermaid.config.json -i #{mmd_file} -o #{svg_file}"
  end
  
  puts "Generated #{Dir.glob("#{svg_dir}/*.svg").length} SVG diagrams"
end

desc "Default task: generate diagrams"
task default: [:diagrams]
