package cn.px;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import javax.servlet.MultipartConfigElement;

@SpringBootApplication
@EnableSwagger2
@Configuration
@ServletComponentScan
public class JeecgApplication {

    public static void main(String[] args) {
    	System.setProperty("spring.devtools.restart.enabled", "false");
        System.getProperties().setProperty("mail.mime.splitlongparameters", "false");
    	SpringApplication.run(JeecgApplication.class, args);
    }


    /**
     * 设置上传文件大小
     * @return
     */
    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize("102400KB");
        factory.setMaxRequestSize("1024000KB");
        return factory.createMultipartConfig();
    }
}

